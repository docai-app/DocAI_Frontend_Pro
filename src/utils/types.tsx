export type SmartExtractionSchema = {
    id: string;
    name: string;
    description: string;
    label: Label;
    label_id: string;
    created_at: string;
    updated_at: string;
    has_label: boolean;
    schema: Schema[];
    user: User;
};

export type Schema = {
    key: string;
    query: string;
    data_type: string;
};

export type Label = {
    id: string;
    name: string;
    meta?: any;
};

export type User = {
    id: string;
    email: string;
    nickname: string;
};

export type UserProps = {
    name: string;
    username: string;
    avatar: string;
    online?: boolean;
    source: any;
    model_type?: any;
    model_types?: any;
    schema?: SmartExtractionSchema;
};

export type MessageProps = {
    id: string;
    content: any;
    created_at: string;
    unread?: boolean;
    sender: UserProps | 'You';
    type?: string;
    attachment?: {
        fileName: string;
        type: string;
        size: string;
    };
};

export type ChatProps = {
    id: string;
    sender: UserProps;
    messages: MessageProps[];
};

export type DriveDocument = {
    id: string;
    name: string;
    storage_url: string;
    status: string;
    created_at: string;
    updated_at: string;
    approval_status: string;
    approval_user_id: string;
    approval_at: string;
    folder_id: string;
    upload_local_path: string;
    user_id: string;
    is_classified: boolean;
    is_document: boolean;
    meta: any;
    is_classifier_trained: string;
    is_embedded: boolean;
    error_message: string;
    retry_count: number;
    labels: Label[];
    user: User;
}