const Header = () => {
  return (
    <div className="flex flex-col space-y-2 text-center p-4 rounded-lg mb-2 dark:border dark:border-gray-700 md:border-0  text-gray-700 dark:text-gray-400">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Emi Calculator
      </h3>
      <p className="text-sm text-muted-foreground mx-3">
        Empowering Financial Decision-Making: Our EMI Calculator simplifies loan
        planning by providing accurate Equated Monthly Installment calculations.
        Tailored for individuals and businesses alike, this tool offers
        insightful amortization schedules, enabling informed borrowing and
        repayment strategies. Take charge of your financial future with
        precision and confidence.
      </p>
    </div>
  );
};

export default Header;
