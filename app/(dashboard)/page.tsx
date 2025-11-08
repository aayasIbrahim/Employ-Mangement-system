export default function EmployeeHome() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, Ayas 👋</h2>
      <p className="text-gray-600">
        Here’s your work summary for today. You can check attendance, view tasks, and update your profile.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-gray-800">Today’s Attendance</h3>
          <p className="text-sm text-gray-500 mt-2">Clocked in at 9:02 AM</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-gray-800">Active Tasks</h3>
          <p className="text-sm text-gray-500 mt-2">2 Tasks pending</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-gray-800">Leave Balance</h3>
          <p className="text-sm text-gray-500 mt-2">6 days remaining</p>
        </div>
      </div>
    </section>
  );
}
