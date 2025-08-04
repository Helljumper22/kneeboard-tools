class KneeboardGCI extends Kneeboard {
  constructor() {
    super();
    this.kneeboardTemplate = GCI;
    this.kneeboardName = this.kneeboardTemplate.name;
    this.kneeboardId = this.kneeboardTemplate.id;
  }
}