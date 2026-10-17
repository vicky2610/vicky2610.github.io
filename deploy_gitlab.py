#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把本站点发布到 GitLab Pages（全程走 gitlab.com API，不需要本地 git push）。

用法：
    python deploy_gitlab.py --token glpat-xxxx
    python deploy_gitlab.py --token glpat-xxxx --path qiqi-portfolio
    GITLAB_TOKEN=glpat-xxxx python deploy_gitlab.py

Token 创建：https://gitlab.com/-/user_settings/personal_access_tokens
需要的 scope：api（够用），有效期建议 7 天。
"""

import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://gitlab.com/api/v4"
SKIP_DIRS = {".git", ".shots", "node_modules", "__pycache__", ".idea", ".vscode"}
SKIP_FILES = {".DS_Store", "deploy.py", "deploy_gitlab.py"}
BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".woff", ".woff2", ".mp4", ".svgz"}


def log(msg):
    print(msg, flush=True)


class GL:
    def __init__(self, token):
        self.token = token

    def call(self, method, path, payload=None, ok=(200, 201, 204)):
        url = API + path
        data = None
        headers = {
            "Authorization": "Bearer " + self.token,
            "User-Agent": "qiqi-portfolio-deploy",
            "Accept": "application/json",
        }
        if payload is not None:
            data = json.dumps(payload).encode("utf-8")
            headers["Content-Type"] = "application/json"
        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                raw = resp.read().decode("utf-8")
                return resp.status, (json.loads(raw) if raw.strip() else {})
        except urllib.error.HTTPError as e:
            raw = e.read().decode("utf-8", "ignore")
            try:
                parsed = json.loads(raw)
            except Exception:
                parsed = {"message": raw[:300]}
            if e.code in ok:
                return e.code, parsed
            raise RuntimeError("HTTP %s %s %s -> %s" % (e.code, method, path, parsed.get("message") or parsed))


def collect(root):
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if name in SKIP_FILES:
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, root).replace("\\", "/")
            files.append((rel, full))
    files.sort()
    return files


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--token", default=os.environ.get("GITLAB_TOKEN", ""))
    ap.add_argument("--path", default="", help="项目路径，默认 <username>.gitlab.io")
    ap.add_argument("--dir", default=os.path.dirname(os.path.abspath(__file__)))
    ap.add_argument("--message", default="feat: portfolio site")
    args = ap.parse_args()

    if not args.token:
        log("缺少 token：python deploy_gitlab.py --token glpat-xxxx")
        return 2

    gl = GL(args.token)
    root = os.path.abspath(args.dir)

    log("1/6 校验 token ...")
    _, me = gl.call("GET", "/user")
    username = me["username"]
    log("   已登录：%s（%s）" % (username, me.get("name") or "-"))

    want_path = args.path or (username + ".gitlab.io")
    encoded = urllib.parse.quote(want_path, safe="")

    log("2/6 检查项目 %s ..." % want_path)
    status, project = gl.call("GET", "/projects/" + encoded, ok=(200, 404))
    if status == 404:
        log("   创建公开项目 ...")
        status, project = gl.call(
            "POST",
            "/projects",
            {
                "name": want_path,
                "path": want_path,
                "description": "琦琦 · 抖音 / 小红书媒介投放作品集",
                "visibility": "public",
                "initialize_with_readme": False,
                "auto_devops_enabled": False,
            },
            ok=(201, 400),
        )
        if status != 201:
            log("   路径 %s 不可用（%s），改用 qiqi-portfolio" % (want_path, project.get("message")))
            want_path = "qiqi-portfolio"
            encoded = urllib.parse.quote(want_path, safe="")
            status, project = gl.call("GET", "/projects/" + encoded, ok=(200, 404))
            if status == 404:
                _, project = gl.call(
                    "POST",
                    "/projects",
                    {
                        "name": want_path,
                        "path": want_path,
                        "description": "琦琦 · 抖音 / 小红书媒介投放作品集",
                        "visibility": "public",
                        "initialize_with_readme": False,
                        "auto_devops_enabled": False,
                    },
                )
    pid = project["id"]
    log("   项目 ID：%s，可见性：%s" % (pid, project.get("visibility")))

    files = collect(root)
    log("3/6 上传 %d 个文件 ..." % len(files))
    actions = []
    for rel, full in files:
        ext = os.path.splitext(rel)[1].lower()
        with open(full, "rb") as fh:
            raw = fh.read()
        if ext in BINARY_EXT:
            action = {
                "action": "create",
                "file_path": rel,
                "content": base64.b64encode(raw).decode("ascii"),
                "encoding": "base64",
            }
        else:
            action = {"action": "create", "file_path": rel, "content": raw.decode("utf-8")}
        actions.append(action)
        log("   + %s" % rel)

    log("4/6 提交到 main ...")
    status, commit = gl.call(
        "POST",
        "/projects/%s/repository/commits" % pid,
        {"branch": "main", "commit_message": args.message, "actions": actions},
        ok=(201, 400),
    )
    if status != 201:
        raise RuntimeError("提交失败：%s" % (commit.get("message") or commit))
    log("   commit %s" % commit.get("short_id") or commit.get("id", "")[:8])

    site = project.get("pages_access_level", "")
    log("5/6 等待流水线 ...")
    pipeline = None
    for i in range(40):
        st, pipes = gl.call("GET", "/projects/%s/pipelines?per_page=1" % pid, ok=(200, 404))
        if isinstance(pipes, list) and pipes:
            p = pipes[0]
            if not pipeline or pipeline.get("status") != p.get("status"):
                log("   [%02d] pipeline #%s %s" % (i + 1, p.get("id"), p.get("status")))
            pipeline = p
            if p.get("status") in ("success", "failed", "canceled", "skipped"):
                break
        else:
            log("   [%02d] 等待流水线创建 ..." % (i + 1))
        time.sleep(6)

    site_url = ""
    if pipeline and pipeline.get("status") == "success":
        log("6/6 流水线成功，读取站点地址 ...")
        for _ in range(20):
            st, pages = gl.call("GET", "/projects/%s/pages" % pid, ok=(200, 404))
            if st == 200 and pages.get("url"):
                site_url = pages["url"]
                break
            time.sleep(6)
    else:
        log("6/6 流水线状态：%s" % (pipeline or {}).get("status"))
        if pipeline:
            st, jobs = gl.call("GET", "/projects/%s/pipelines/%s/jobs" % (pid, pipeline["id"]), ok=(200,))
            for j in jobs if isinstance(jobs, list) else []:
                log("   job %s: %s %s" % (j.get("name"), j.get("status"), j.get("failure_reason") or ""))

    log("")
    log("仓库：https://gitlab.com/%s" % project.get("path_with_namespace", ""))
    if site_url:
        log("站点：%s" % site_url)
    else:
        log("站点：https://%s.gitlab.io/%s" % (username, "" if want_path == username + ".gitlab.io" else want_path + "/"))
        log("（若尚未生效，等 1–3 分钟后刷新 Deploy → Pages）")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except RuntimeError as e:
        log("失败：%s" % e)
        sys.exit(1)
