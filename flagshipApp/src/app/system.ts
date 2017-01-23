export interface System {
    name: string;
    apps: [
        {
            name: string;
            description: string;
            location: string;
            script: string;
        }
    ];
}
