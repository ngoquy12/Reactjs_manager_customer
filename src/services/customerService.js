import BASE_URL from "../api/instance";
import { DELETE, GET } from "../constants/httpMethod";

/**
 * Hàm gọi API lấy danh sách khách hàng
 * @returns Dữ liệu danh sách khách hàng
 * NVQUY (24/09/2024)
 */
export const getAllCustomer = async () => {
  const response = BASE_URL[GET]("customers");

  return response;
};

/**
 * Hàm gọi API tìm kiếm, phân trang, sắp xếp, lọc
 * @returns Dữ liệu danh sách khách hàng
 * NVQUY (24/09/2024)
 */
export const searchAndPaging = async (searchValue, pageSize, currentPage) => {
  const response = BASE_URL[GET](
    `customers?_page=${currentPage}&_limit=${pageSize}&email_like=${searchValue}`
  );

  return response;
};

/**
 * Hàm gọi API xóa thông tin một customer theo id
 * @param {*} id: Id cần xóa
 * @returns
 */
export const removeCustomerById = (id) => {
  const response = BASE_URL[DELETE](`customers/${id}`);

  return response;
};
