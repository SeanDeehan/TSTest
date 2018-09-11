class ShipmentUpdateListener implements ShipmentUpdateListenerInterface {
  shipmentSearchIndex: ShipmentSearchIndex

  processingShipments: {[key:string]:any;} = {}

  constructor() {
    this.shipmentSearchIndex = new ShipmentSearchIndex()
  }

  async receiveUpdate(id: string, shipmentData: any) {
    const shipmentState: ShipmentState = this.processingShipments[id]

    if (!shipmentState) {
      await this.shipmentSearchIndex.updateShipment(id, shipmentData)

      await this.processPendingUpdateIfRequired(id)
    } else {
      //Only need to keep the latest if we need to make all the changes then it would be different
      this.processingShipments[id] = shipmentData
    }
  }

  async processPendingUpdateIfRequired(id: string) {
    if (this.processingShipments[id]) {
      const shipmentData = this.processingShipments[id]

      this.processingShipments[id] = null

      await this.receiveUpdate(id, shipmentData)
    }
  }
}"# TSTest" 
