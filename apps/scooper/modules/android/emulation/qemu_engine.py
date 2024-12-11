
import subprocess
import telnetlib
import time
import logging

QEMU_START_DELAY = 60

class QEMUEngine(object):
    """ Connection to the QEMU VMs """

    def  __init__(
        self,
        hda,
        telnet_port,
        hostfwd_port,
        qemu_no_graphic
    ):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger("QEMU Emulator")

        self.hda = hda
        self.domain = "localhost"
        self.telnet_port = telnet_port
        self.hostfwd_port = hostfwd_port
        self.qemu_no_graphic = qemu_no_graphic
        self.connected = False

    def setup(self):
        qemu_cmd = ["qemu-system-i368", "-hda", self.hda, "-smp", "cpus=4", "-m", "2048", "-machine", "q35", "-monitor", f"telnet:{self.domain}:{self.telnet_port},server,nowait", "-net", "nic,model=e1000", "-net", f"user,hostfwd=tcp::{self.hostfwd_port}-:5555", "-enable-kvm"]
        if self.qemu_no_graphic:
            qemu_cmd.append("-nographic")
        self.logger.info(qemu_cmd)
        self.qemu_p = subprocess.Popen(qemu_cmd)
        self.pid = self.qemu_p.pid
        time.sleep(QEMU_START_DELAY)

    def utf8bytes(self, string):
        return bytes(string, encoding='utf-8')
    
    def connect(self, from_snapshot=False):
        self.qemu_tel = telnetlib.Telnet(host=self.domain, port=self.telnet_port)
        self.logger.info(self.qemu_tel.read_until(self.utf8bytes("\r\n")))

        if from_snapshot:
            self.send_command("stop")
            self.send_command("loadvm spawn")
            self.send_command("cont")

            self.send_keystrokes(["alt-f1"])
            self.send_keystrokes("killall")
            self.send_keystrokes(["spc"])
            self.send_keystrokes("&")
            self.send_keystrokes(["kp_enter"])
            self.send_keystrokes(["alt-f7"])

            self.send_command("stop")
            self.send_command("delvm spawn")
            self.send_command("cont")

        print(["adb", "connect", f"{self.domain}:{self.hostfwd_port}"])
        p = subprocess.Popen(["adb", "connect", f"{self.domain}:{self.hostfwd_port}"])
        p.wait()
        self.connected = True

    def send_command(self, command_str):
        """ send command over telnet, read result """
        self.qemu_tel.write(self.utf8bytes(command_str + "\r\n"))
        self.qemu_tel.read_until(self.utf8bytes("\r\n"))
        self.qemu_tel.read_until(self.utf8bytes("\r\n"))

    def send_keystrokes(self, keystrokes):
        for keystroke in keystrokes:
            self.send_command(f"sendkey {keystroke}")

    def check_connectivity(self):
        """ Check if QEMU is connected """
        return self.connected
    
    def disconnect(self):
        self.qemu_tel.close()

    def teardown(self):
        self.qemu_p.kill()


