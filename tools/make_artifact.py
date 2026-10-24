# Builds artifact.html (claude.ai artifact page: no doctype/html/head/body, the tool adds them)
import re
src = open("index.html").read()
body = re.search(r"<body>(.*)</body>", src, re.S).group(1).strip()
page = """<title>Feline Investments</title>
<link rel="stylesheet" href="css/style.css">
<style>html, body { height: 100%; } body { background: #0e1626; }</style>
""" + body + "\n"
open("artifact.html", "w").write(page)
print("artifact.html", len(page))
