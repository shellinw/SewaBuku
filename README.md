# SewaBuku
Aplikasi sederhana untuk sistem sewa buku.

Terdapat Fitur:
* Penampilkan daftar buku. 
* Menyewa buku.
* Menghitung total biaya sewa berdasarkan durasi (dari tanggal Pinjam dan tanggal pengembalian).


## Models :

_buku_

```
- id : primary
- judul : string
- penulis: string
- tarifPerHari : integer
```
&nbsp;

## Endpoints :

List of available endpoints:

- `GET /books`
- `POST /rent/:id`


&nbsp;

## 1. GET /books

```

_Response (200 - OK)_

```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "judul": "Dasar-Dasar HTML dan CSS",
            "penulis": "Jane Smith",
            "tarifPerHari": 15000,
            "createdAt": "2024-12-25T14:38:34.745Z",
            "updatedAt": "2024-12-25T14:38:34.745Z"
        },
        {
            "id": 2,
            "judul": "Machine Learning dengan Python",
            "penulis": "Alice Johnson",
            "tarifPerHari": 25000,
            "createdAt": "2024-12-25T14:38:34.745Z",
            "updatedAt": "2024-12-25T14:38:34.745Z"
        }
    ]
}
```

## 2. POST /rent/:id

Request:


- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "tglPinjam": "string",
  "tglKembali": "string",
}
```

_Response (201 - Created)_

```json
{
    "message": "Success",
    "book": {
        "id": 2,
        "judul": "Machine Learning dengan Python",
        "penulis": "Alice Johnson",
        "tarifPerHari": 25000,
        "createdAt": "2024-12-25T14:38:34.745Z",
        "updatedAt": "2024-12-25T14:38:34.745Z"
    },
    "tarif": 75000
}
```


_Response (400 - Bad Request)_

```json
{
    {
    "message": "Tanggal Kembali Tidak Boleh Lebih Awal Dari Tanggal Pinjam."
}
}
```

_Response (404 - Bad Request)_
```json
{
    {
    "message": "Data not found"
}
}
```