export interface Dossier {
  title: string;
  subtitle: string;
  narrative: string;
  fontStyle: "serif" | "handwritten";
  metadata: string;
}

export const dossiers: Record<string, Dossier> = {
  campari: {
    title: "Campari Botanical Prints",
    subtitle: "Heritage Digitale & Strategia Editoriale",
    narrative:
      "Dall'analisi chimica delle radici alla costruzione di un ecosistema digitale. Ho curato l'heritage di Campari trasformando la tradizione botanica in strategia editoriale e ROI misurabile. Qui, l'alchimia del passato diventa la performance del presente.",
    fontStyle: "serif",
    metadata: "Campari Group · Digital Heritage · Milano",
  },
  richemont: {
    title: "Patek Philippe / Glashütte",
    subtitle: "Moralità della Precisione",
    narrative:
      "Ginevra–Glashütte. Gestire la logistica di Homo Faber significa coordinare la bellezza con la precisione del secondo. Non è solo management; è una 'moralità della precisione' applicata a flussi globali complessi, dove ogni ingranaggio deve servire l'eccellenza senza margini d'errore.",
    fontStyle: "serif",
    metadata: "Richemont · Operations · Genève",
  },
  christies: {
    title: "La Dolce Vita",
    subtitle: "Psicologia del Desiderio",
    narrative:
      "Un'analisi fredda del desiderio. Oltre l'estetica del lusso, ho studiato la psicologia comportamentale degli HNWI. Conservare il prestigio istituzionale significa bilanciare la rarità dell'oggetto con la spietata logica del mercato internazionale.",
    fontStyle: "serif",
    metadata: "Christie's · Auction Intelligence · London",
  },
  loyola: {
    title: "Baseball & Storytelling",
    subtitle: "New Orleans, 2024",
    narrative:
      "New Orleans, 2024. GPA 4.0. Ho imparato che il marketing è come un 'pitch' perfetto: non conta solo la forza, ma il tempo, la rotazione, il momento esatto in cui lasci andare la palla. Lo storytelling americano mi ha insegnato la precisione del ritmo. Qui il pop incontra l'accademia: precisione, tempismo, e la capacità di raccontare una storia che resti impressa nella memoria.",
    fontStyle: "handwritten",
    metadata: "Loyola University · New Orleans · 2024",
  },
};
