export default class System {
    constructor() { }

    activatedAsync(dispatcher) {
        console.log("activatedAsync");
    }

    approveEntityRemovalAsync(entity) {
        console.log("approveEntityRemovalAsync");
    }

    deactivatedAsync() { 
        
    }

    disposedAsync() { }

    entityAddedAsync(entity) { }

    entityRemovedAsync(entity) { }

    entityRetrievedAsync(entity) { }

    entityUpdatedAsync(oldEntity, updatedEntity) { }

    logError(error) { }

    logMessage(message) { }

    logWarning(warning) { }

    initializeAsync(dispatcher) { }

    serviceRemovedAsync(name) { }

    validateEntityAsync(entity) { }

}