import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class MensagensDTO {
    readonly id_mensagem: number;
    readonly id_remetente: number;
    readonly id_conversa: number;
    readonly conteudo: String;
  
    constructor(msg: MensagensDTO) {
      this.id_mensagem = msg.id_mensagem;
      this.id_remetente = msg.id_remetente;
      this.id_conversa = msg.id_conversa;
      this.conteudo = msg.conteudo;
    }
  }
  
  
 /* export class UserService {
    async createUser(userDto: UserDTO): Promise<UserDTO> {
      const user = new User();
      user.name = userDto.name;
      user.email = userDto.email;
      user.password = userDto.password;
      const createdUser: User = await userRepository.save(user)
      return new UserDTO(createdUser);
    } 
  }*/