export const getSelectValues = (values: {
  [x: string]: { value: unknown; label: string } & string;
}): {
  [x: string]: string | number;
} =>
  Object.keys(values).reduce((newObj, old) => {
    const newValue =
      typeof values[old] === "object" ? values[old].value : values[old];
    return {
      ...newObj,
      [old]: newValue,
    };
  }, {});

export const getStates = (): Array<{ label: string; value?: string }> => [
  { label: "AC", value: "ac" },
  { label: "AL", value: "al" },
  { label: "AP", value: "ap" },
  { label: "AM", value: "am" },
  { label: "BA", value: "ba" },
  { label: "CE", value: "ce" },
  { label: "DF", value: "df" },
  { label: "ES", value: "es" },
  { label: "GO", value: "go" },
  { label: "MA", value: "ma" },
  { label: "MT", value: "mt" },
  { label: "MS", value: "ms" },
  { label: "MG", value: "mg" },
  { label: "PA", value: "pa" },
  { label: "PB", value: "pb" },
  { label: "PR", value: "pr" },
  { label: "PE", value: "pe" },
  { label: "PI", value: "pi" },
  { label: "RJ", value: "rj" },
  { label: "RN", value: "rn" },
  { label: "RS", value: "rs" },
  { label: "RO", value: "ro" },
  { label: "RR", value: "rr" },
  { label: "SC", value: "sc" },
  { label: "SP", value: "sp" },
  { label: "SE", value: "se" },
  { label: "TO", value: "to" },
];

export const createWhatsappLink = (
  number: string,
  textVariables: string
): string | undefined => {
  if (!number) return undefined;
  return `https://web.whatsapp.com/send?phone=55${number}&text=${textVariables}`;
};

export const fuseTicketsWithUsers = (
  tickets: Array<{
    volunteersUserId: number;
    individualsUserId: number;
    individualsTicketId: number;
    volunteersTicketId: number;
    created_at: number;
  }>,
  users: Array<{
    name: string;
    whatsapp: string;
    state: string;
    phone: string;
    organization_id: number;
    user_id: number;
  }>
) => {
  return tickets.map((ticket) => {
    return {
      recipient: {
        ...users.find((user) => user.user_id === ticket.individualsUserId),
        ticketId: ticket.individualsTicketId,
      },
      volunteer: {
        ...users.find((user) => user.user_id === ticket.volunteersUserId),
        ticketId: ticket.volunteersTicketId,
      },
      createdAt: ticket.created_at,
    };
  });
};
