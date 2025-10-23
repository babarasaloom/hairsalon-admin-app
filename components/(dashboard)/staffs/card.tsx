import { User, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function StaffCard({ member }: any) {
  return (
    <Link
      href={`/staff/${member.id}`}
      className="block cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-3 mb-2">
        <User className="text-gray-600 w-6 h-6" />
        <div>
          <h2 className="font-semibold text-gray-800">{member.name}</h2>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      </div>

      <div className="text-sm text-gray-600">{member.email}</div>
      <div className="text-sm text-gray-600 mb-2">{member.phone}</div>

      <div className="flex items-center justify-between text-sm">
        <span
          className={`flex items-center gap-1 ${
            member.availability ? "text-green-600" : "text-gray-500"
          }`}
        >
          {member.availability ? (
            <CheckCircle size={14} />
          ) : (
            <XCircle size={14} />
          )}
          {member.availability ? "Available" : "Unavailable"}
        </span>
      </div>
    </Link>
  );
}
