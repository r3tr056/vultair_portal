
import os
import logging
import pkg_resources
import shutil
import sys
from threading import Timer

from scooper.modules.android.device import Device
from scooper.modules.android.device_state import DeviceState
from scooper.modules.android.app import App

class Scooper(object):
    """ The Scooper Application class """

    instance = None

    def __init__(
        self,
        app_path = None,
        device_serial = None,
        is_emulator=False,
        output_dir=None,
        timeout = None,
        keep_env=None,
        keep_app=None,
        humanoid=None,
        ignore_ad=True,
        replay_output=None,
        cv_mode=None,
        grant_perm=None
    ):
        logging.basicConfig(level=logging.DEBUG)

        self.logger = logging.getLogger(self.__class__.__name__)
        Scooper.instance = self

        self.output_dir = output_dir
        if output_dir is not None:
            if not os.path.isdir(output_dir):
                os.makedirs(output_dir)

        self.timeout = timeout
        self.timer = None
        self.keep_env = keep_env
        self.keep_app = keep_app

        self.device = None
        self.app = None
        self.scooper = None
        self.env_manager = None
        self.input_manager = None
        self.enable_accessiblity_hard = True
        self.humanoid = humanoid
        self.ignore_ad = ignore_ad
        self.replay_output = replay_output

        self.enabled = True

        try:
            self.device = Device(
                device_serial=device_serial,
                is_emulator=is_emulator,
                output_dir=self.output_dir,
                cv_mode=cv_mode,
                grant_perm=grant_perm,
                enable_accessibility_hard=self.enable_accessiblity_hard,
                humaniod=self.humanoid,
                ignore_ad=ignore_ad
            )

            self.app = App(
                app_path=app_path,
                output_dir=self.output_dir,
            )

            # TODO : Make the classes
            self.env_manager = None
            self.input_manager = None

        except Exception:
            import traceback
            traceback.print_exc()

    def start(self):
        """ Start interacting """
        if not self.enabled:
            return
        
        self.logger.info("Starting Scooper...")
        try:
            if self.timeout > 0:
                self.timer = Timer(self.timeout, self.stop)
                self.timer.start()

            self.device.set_up()

            if not self.enabled:
                return
            
            self.device.connect()

            if not self.enabled:
                return
            self.device.install_app(self.app)

            if not self.enabled:
                return
            
            if self.scooper is not None:
                self.scooper.set_apk(self.app.app_path)
                self.scooper.start_unblocked()
                self.input_manager.start()
                self.input_manager.start()
                self.scooper.stop()
                self.scooper.get_output()
            else:
                self.input_manager.start()

        except Exception:
            import traceback
            traceback.print_exc()

    def stop(self):
        self.enabled = False
        if self.timer and self.timer.is_alive():
            self.timer.cancel()
        if self.env_manager:
            self.env_manager.stop()
        if self.input_manager:
            self.input_manager.stop()
        if self.droidbox:
            self.droidbox.stop()
        if self.device:
            self.device.disconnect()
        if not self.keep_env:
            self.device.tear_down()
        if not self.keep_app:
            self.device.uninstall_app(self.app)
        if hasattr(self.input_manager.policy, "master") and self.input_manager.policy.master:
            import xmlrpc.client
            proxy = xmlrpc.client.ServerProxy(self.input_manager.policy.master)
            proxy.stop_worker(self.device.serial)

