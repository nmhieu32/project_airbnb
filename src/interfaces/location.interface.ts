export interface Location {
    id:        number;
    tenViTri:  string;
    tinhThanh: string;
    quocGia:   string;
    hinhAnh:   string;
}

export interface DataLocation {
    pageIndex: number;
    pageSize:  number;
    totalRow:  number;
    keywords:  null;
    data:      Location[];
}