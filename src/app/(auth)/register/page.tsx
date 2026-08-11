import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-4 transition-colors duration-300">
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
            برای ورود به{" "}
            <span className="text-primary font-bold">لیست کارها</span> اطلاعات
            خود را وارد کنید.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
