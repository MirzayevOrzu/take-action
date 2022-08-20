type UserTable = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

type PlaylistTable = {
    id: number;
    title: string;
    description: string;
    user_id: number;
}

type ActionTable = {
    id: number;
    name: string;
    link: string;
    status: 'todo' | 'in_process' | 'done';
    order: number;
    created_at: Date;
    playlist_id: number;
    user_id: number
}