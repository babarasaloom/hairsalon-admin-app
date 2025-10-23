import StaffCard from "./card";

export default function StaffList({ staff }: any) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {staff.map((member: any) => (
        <StaffCard key={member.id} member={member} />
      ))}
    </div>
  );
}
