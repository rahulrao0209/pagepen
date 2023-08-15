export type DomData = {
  originals: Node[];
  fragments: DocumentFragment[];
};

export type RangeData = {
  xpathStart: string;
  xpathEnd: string;
  startOff: number;
  endOff: number;
  uid: string;
};
