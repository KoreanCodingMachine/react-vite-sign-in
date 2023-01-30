export interface IProduct {
  id: number  // 물품 id
  name: string  // 이름
  brand: string // 브랜드
  stock: number // 재고량
  price: number // 가격 (정수)
  discountRate: number  // 할인률(0 ~ 1 의 부동소수점 값)
}

export interface ITodo {
    id: number
    text: string
    checked: boolean
}

export type SignInFormValue = {
  email: string
  password: string
}

export type SignUpFormValue = SignInFormValue & {
  passwordConfirm: string
}