interface PointsTransactionsProps {
  id: string
}

export function PointsTransactions({ id }: PointsTransactionsProps) {
  // Simulated transactions
  const transactions = Array(8)
    .fill(0)
    .map((_, i) => ({
      id: `transaction-${i + 1}`,
      date: `2023-06-${String(i + 1).padStart(2, "0")}`,
      description:
        i % 4 === 0
          ? "로그인 보너스"
          : i % 4 === 1
            ? "콘텐츠 업로드 보상"
            : i % 4 === 2
              ? "프로필 스킨 구매"
              : "챌린지 참여 보상",
      amount: i % 3 === 2 ? -Math.floor(Math.random() * 500) : Math.floor(Math.random() * 300),
      balance: 12500 - i * 100,
      status: "completed",
    }))

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">포인트 거래 내역</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">날짜</th>
                <th className="py-3 px-4 text-left">설명</th>
                <th className="py-3 px-4 text-right">변동</th>
                <th className="py-3 px-4 text-right">잔액</th>
                <th className="py-3 px-4 text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-500">{transaction.date}</td>
                  <td className="py-4 px-4">{transaction.description}</td>
                  <td
                    className={`py-4 px-4 text-right font-medium ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-medium">{transaction.balance.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">완료</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex">
            <button className="px-3 py-1 border rounded-l hover:bg-gray-50">이전</button>
            <button className="px-3 py-1 border-t border-b bg-blue-50 text-blue-500">1</button>
            <button className="px-3 py-1 border-t border-b hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border-t border-b hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded-r hover:bg-gray-50">다음</button>
          </div>
        </div>
      </div>
    </div>
  )
}
