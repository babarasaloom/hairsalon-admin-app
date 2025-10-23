export default function StaffScheduleSection({ name }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-medium text-gray-800 mb-2">Upcoming Schedule</h3>
      <p className="text-sm text-gray-500">
        View detailed weekly schedule for {name}.
      </p>
      <button className="mt-2 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm">
        View Schedule
      </button>
    </div>
  );
}
