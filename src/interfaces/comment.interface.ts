export interface RoomComment {
    id:               number;
    ngayBinhLuan:     string;
    noiDung:          string;
    saoBinhLuan:      number;
    tenNguoiBinhLuan: string;
    avatar:           string;
}

export interface PostComment {
    id:              number;
    maPhong:         number;
    maNguoiBinhLuan: number;
    ngayBinhLuan:    string;
    noiDung:         string;
    saoBinhLuan:     number;
}