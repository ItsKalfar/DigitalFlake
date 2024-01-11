import { CircleUserRound, AlertTriangle } from "lucide-react";

import digitalflakeLogo from "../assets/vector/digitalflake_nav_logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="bg-[#662671] py-5">
      <div className="flex item-center justify-between w-11/12 mx-auto max-w-[1100px]">
        <img
          src={digitalflakeLogo}
          alt="Diitalflake-logo"
          className="w-1/3 md:w-1/4 lg:w-1/6"
        />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CircleUserRound className="text-white my-auto md:w-7 md:h-7 cursor-pointer" />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="text-red-600" />{" "}
                <p className="ml-2 font-semibold text-lg">Log Out</p>
              </div>
              <p className="text-gray-500 font-thin mb-4">
                Are you sure you want to log out ?
              </p>
              <Dialog.Close className="mt-6 focus:outline-none border-none">
                <Button variant={"outline"} className="rounded-3xl mx-2">
                  Cancel
                </Button>
                <Button className="rounded-3xl mx-2" onClick={() => logout()}>
                  Confirm
                </Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </nav>
  );
};
