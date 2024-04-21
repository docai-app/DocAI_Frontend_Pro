import { LabelModel } from './Label';

export interface DocumentModel {
    id: string;
    name: string;
    content: string;
    is_document: boolean;
    storage_url: string;
    labels: LabelModel[];
    created_at: string;
    updated_at: string;
}
