import EditProfileInfo from "@/components/profile/EditProfileInfo";
import LogoutSection from "@/components/profile/LogoutSection";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { getCurrentUser } from "@/lib/auth/session";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
        <ProfileInfo name={user!.name} username={user!.username} />
        <EditProfileInfo name={user!.name} username={user!.username} />
      </div>
      <LogoutSection />
    </div>
  );
}
