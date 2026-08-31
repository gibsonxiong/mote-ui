@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==============================================
echo   Mote UI 文档站点 - 局域网开发模式
echo ==============================================
echo.

echo [1/2] 获取本机局域网 IP...
for /f "usebackq delims=" %%a in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 ^| Where-Object {$_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*'} ^| Select-Object -First 1).IPAddress"`) do set "LAN_IP=%%a"

if defined LAN_IP (
    echo   局域网访问地址: http://%LAN_IP%:5173/mote-ui/
) else (
    echo   未检测到局域网 IP，请查看下方终端输出的 Network 地址
)
echo   本机访问地址:   http://localhost:5173/mote-ui/
echo.
echo [2/2] 启动开发服务器（首次 Windows 防火墙弹窗请点"允许访问"）...
echo.
pnpm dev

pause
