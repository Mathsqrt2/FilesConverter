import { registerEnumType } from "@nestjs/graphql";

export enum DatabaseTablesEnum {
    RESULTS_ON_PACKAGES = `results_on_packages`,
    PACKAGES_ON_REQUESTS = `packages_on_requests`,
    PROCESSING_RESULTS = `processing_results`,
    PROCESSING_REQUESTS = `processing_requests`,
    PROCESSING_STATUSES = `processing_statuses`,
    PROCESSING_PACKAGES = `processing_packages`,
    LOGS = `logs`,
};

registerEnumType(DatabaseTablesEnum, {
    name: `DatabaseTablesEnum`,
    description: `All database tables.`,
});