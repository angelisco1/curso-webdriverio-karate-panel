export declare class SubscriberEntity {
    id: number;
    name: string;
    email: string;
    status: 'suscrito' | 'pendiente' | 'baja';
    user_id?: number;
    active_until?: number;
    unsubscribe_token?: string;
    created_at: number;
    interests?: string[];
}
