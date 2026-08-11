import { LogOut } from "lucide-react";
import LogoutConfirmation from "./LogoutConfirmation";

function LogoutSection() {
  return (
    <div className="mt-6 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-destructive flex items-center justify-center">
            <LogOut className="text-destructive-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">خروج</h3>
            <p className="text-xs text-muted-foreground">
              به طور امن از حساب خود خارج شوید
            </p>
          </div>
        </div>
        <LogoutConfirmation />
      </div>
    </div>
  );
}

export default LogoutSection;
