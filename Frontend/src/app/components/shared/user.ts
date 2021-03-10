export class User {
    constructor(
		public  idUser : number,
        public identification: string,
        public active: boolean,
        public isAdmin: boolean
    ) {}
}