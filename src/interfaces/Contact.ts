export type Contact = {
  id: string;
  name: string;
  email?: string;
  phones: [string];
  address?: string;
  speedDial: boolean;
  speedDialShortcut?: string;
  notes?: Array<string | undefined>;
};
