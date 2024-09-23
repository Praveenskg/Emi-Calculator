import jsPDF from "jspdf";
import "jspdf-autotable";

const Amortization = ({
  emi,
  amortization,
  showGst,
  totalInterestPayable,
  gstAmount,
  principal,
  annualInterestRate,
  tenureMonths,
}) => {
  const totalPrincipal = amortization.reduce(
    (acc, item) => acc + item.principal,
    0
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    const date = new Date().toLocaleDateString();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Amortization Schedule", pageWidth / 2, 20, { align: "center" });

    const lineY = 25;
    doc.setLineWidth(0.8);
    doc.line(15, lineY, pageWidth - 15, lineY);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const principalAmountText = `Principal Amount: ${principal.toFixed(2)}`;
    const interestRateText = `Interest Rate: ${(
      annualInterestRate * 100
    ).toFixed(2)}%`;
    doc.text(principalAmountText, 15, 35);
    doc.text(
      interestRateText,
      pageWidth - 15 - doc.getTextWidth(interestRateText),
      35
    );

    const loanTenureText = `Loan Tenure: ${tenureMonths} months`;
    const gstRateText = showGst
      ? `GST Rate: ${((gstAmount / totalInterestPayable) * 100).toFixed(2)}%`
      : "";
    doc.text(loanTenureText, 15, 40);
    if (showGst) {
      doc.text(gstRateText, pageWidth - 15 - doc.getTextWidth(gstRateText), 40);
    }

    // Print EMI amount
    const emiAmountText = `EMI Amount: ${emi.toFixed(2)}`;
    doc.text(emiAmountText, 15, 45);
    doc.setFontSize(12);
    doc.text(
      `Generated on: ${date}`,
      pageWidth - 15 - doc.getTextWidth(`Generated on: ${date}`),
      45
    );

    // Define columns with enhanced styling
    const columns = [
      { header: "Sr. No.", dataKey: "srNo" },
      { header: "Opening Balance", dataKey: "openingBalance" },
      { header: "EMI Amount", dataKey: "emi" },
      { header: "Principal Amount", dataKey: "principal" },
      { header: "Interest Amount", dataKey: "interest" },
      ...(showGst ? [{ header: "GST", dataKey: "gst" }] : []),
      { header: "Closing Balance", dataKey: "closingBalance" },
      { header: "Total Payment", dataKey: "finalAmount" },
    ];

    const rows = amortization.map((item, index) => ({
      srNo: index + 1,
      openingBalance: item.openingBalance.toFixed(2),
      emi: item.emi.toFixed(2),
      principal: item.principal.toFixed(2),
      interest: item.interest.toFixed(2),
      gst: showGst ? item.gst.toFixed(2) : null,
      closingBalance: item.closingBalance.toFixed(2),
      finalAmount: (
        item.principal +
        item.interest +
        (showGst ? item.gst : 0)
      ).toFixed(2),
    }));

    rows.push({
      srNo: "Total",
      openingBalance: "",
      emi: "",
      principal: totalPrincipal.toFixed(2),
      interest: totalInterestPayable.toFixed(2),
      gst: showGst ? gstAmount.toFixed(2) : null,
      closingBalance: "",
      finalAmount: (
        totalPrincipal +
        totalInterestPayable +
        (showGst ? gstAmount : 0)
      ).toFixed(2),
    });

    doc.autoTable({
      startY: 50,
      columns,
      body: rows,
      styles: {
        fontSize: 9,
        cellPadding: 1,
        valign: "middle",
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        halign: "center",
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      bodyStyles: {
        textColor: [33, 37, 41],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        srNo: { halign: "center" },
        openingBalance: { halign: "center" },
        emi: { halign: "center" },
        principal: { halign: "center" },
        interest: { halign: "center" },
        gst: { halign: "center" },
        closingBalance: { halign: "center" },
        finalAmount: { halign: "center" },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(
      "This schedule provides the breakdown of principal, interest, and EMI payments for each month.",
      15,
      finalY
    );

    doc.setFontSize(9);
    doc.text(
      "Thank You Using Emi Calculator",
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    const filename = showGst
      ? "amortization-schedule-Gst.pdf"
      : "amortization-schedule.pdf";
    doc.save(filename);
  };

  return (
    <>
      {emi > 0 && (
        <div className="px-1 py-3">
          <h3 className="bg-gray-50 dark:bg-gray-800 text-lg font-bold py-2 my-2 px-3 border rounded border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400">
            EMI: ₹{emi.toFixed(2)}
          </h3>
          <h3 className="text-center bg-gray-50 dark:bg-gray-800 text-lg font-bold py-2 border-t border-r border-l rounded-t-lg border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400">
            Amortization Schedule
          </h3>
          <div className="overflow-x-auto overflow-hidden border border-gray-200 dark:border-gray-700 rounded-b-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Opening Balance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EMI Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Principal Amt
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Interest Amount
                  </th>
                  {showGst && (
                    <th scope="col" className="px-6 py-3">
                      GST
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3">
                    Principal Balance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Final Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {amortization.map((item, index) => (
                  <tr
                    key={item.month}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {item.openingBalance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{item.emi.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.principal.toFixed(2)}</td>
                    <td className="px-6 py-4">{item.interest.toFixed(2)}</td>
                    {showGst && (
                      <td className="px-6 py-4">{item.gst.toFixed(2)}</td>
                    )}
                    <td className="px-6 py-4">
                      {item.closingBalance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {(
                        item.principal +
                        item.interest +
                        (showGst ? item.gst : 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {/* Total row will be rendered within the table */}
                <tr className="font-bold">
                  <td className="px-6 py-4">Total</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">{totalPrincipal.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {totalInterestPayable.toFixed(2)}
                  </td>
                  {showGst && (
                    <td className="px-6 py-4">{gstAmount.toFixed(2)}</td>
                  )}
                  <td className="px-6 py-4">=</td>
                  <td className="px-6 py-4">
                    {(
                      totalPrincipal +
                      totalInterestPayable +
                      (showGst ? gstAmount : 0)
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={downloadPDF}
              className="bg-indigo-600 dark:bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Amortization;
