# backend/server.py
import http.server
import socketserver
import json
from data import APP_DATA

PORT = 8001  # Using 8001 to avoid potential conflicts
HOST = '127.0.0.1'

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*') 
            self.end_headers()
            json_string = json.dumps(APP_DATA)
            self.wfile.write(bytes(json_string, "utf8"))
            return
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

Handler = MyHttpRequestHandler

with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    print(f"Backend server started at http://{HOST}:{PORT}")
    httpd.serve_forever()
