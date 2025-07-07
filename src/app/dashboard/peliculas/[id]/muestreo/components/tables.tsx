const categories = {
  Sencillo: 2,
  Doble: 4,
  Triple: 6,
  Cuadruple: 8,
  Quintuple: 10,
};

export default function MuestreoTables({
  peso_objetivo,
  peso_rollo,
  category,
}: {
  peso_objetivo: number;
  peso_rollo: number;
  category: string;
}) {
  const ColumnInto = categories[category as keyof typeof categories];

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-center">Tarima 1 Peso Objetivo: {peso_objetivo}</h2>

      <div className="min-w-max">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-amber-800 text-white">
              <th className="p-2 border">Paradas</th>
              {[...Array(ColumnInto)].map((_, i) => (
                <th key={i} className="p-2 border min-w-[100px]">
                  Rollo {i + 1}
                </th>
              ))}
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(ColumnInto)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border font-medium">
                  Parada {rowIndex + 1}
                </td>
                {[...Array(ColumnInto)].map((_, colIndex) => (
                  <td key={colIndex} className="p-2 border text-center">
                    {`Rollo ${colIndex + 1}`}
                  </td>
                ))}

                <td className="p-2 border font-medium">{`${
                  peso_rollo * ColumnInto
                } Kg`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
