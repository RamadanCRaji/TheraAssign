"use client";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import Link from "next/link";
function AuthSocialButton({ loading, icon: Icon, onClick, ...props }) {
  return (
    <div className="grow">
      <Button
        variant="outline"
        type="button"
        onClick={onClick}
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icon className="mr-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export default AuthSocialButton;
