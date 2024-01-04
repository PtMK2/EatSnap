package crypto

import "golang.org/x/crypto/bcrypt"

//暗号化（ハッシュ化）する関数
func PasswordEncrypt(password string) (string, error) {

	//ハッシュ化　セキュリティの観点から12～15が望ましい　小さいほど処理速度が上がる
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	//正常時、errにnil(俗にいうnull)が入っている
	return string(hash), err
}

//入力された平パスワードと暗号化されたパスワードの比較
func CompareHashAndPassword(hash, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}
