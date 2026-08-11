import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 flex items-center justify-center mb-4">
          <Image
            src={"/logo.png"}
            alt="لیست کارها"
            width={64}
            height={64}
            draggable={false}
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground">خوش آمدید</h1>
        <p className="text-muted-foreground mt-2 text-center">
          برای ثبت نام در{" "}
          <span className="text-primary font-semibold">لیست کارها</span> اطلاعات
          خود را وارد کنید.
        </p>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <RegisterForm />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-6">
        از قبل حساب کاربری دارید؟
        <Link href="/login" className="font-semibold text-primary ms-1">
          ورود
        </Link>
      </p>
    </div>
  );
}
