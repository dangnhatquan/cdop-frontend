import Menu from "@components/icons/Menu";
import { Drawer } from "antd";
import { useState } from "react";
import { IContact } from "@models/common";
import "./index.css";
import { colors } from "../../../theme.config";
import PrimaryLogo from "@components/icons/PrimaryLogo";
import Link from "next/link";

export const CustomDrawer = ({ contact }: { contact?: IContact }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={toggleOpen}>
        <Menu color={colors.sand.DEFAULT} width={32} height={32} />
      </div>
      <Drawer
        width="100vh"
        open={open}
        zIndex={10000}
        classNames={{
          header: "bg-white flex flex-row justify-end text-white",
          body: "bg-white",
          footer: "bg-white",
        }}
        style={{ backgroundColor: "#000" }}
        onClose={toggleOpen}
      >
        <div className="w-full flex flex-col justify-start items-end gap-[24px]">
          <PrimaryLogo width={40} height={40} />
          <Link href="/transactions">Lịch sử quyên góp</Link>
        </div>
      </Drawer>
    </>
  );
};
