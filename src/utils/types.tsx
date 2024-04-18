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
    source: string;
    model_type?: string;
    schema?: SmartExtractionSchema;
};

export type MessageProps = {
    id: string;
    content: string;
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
