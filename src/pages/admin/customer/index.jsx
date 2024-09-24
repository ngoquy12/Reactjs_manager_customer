import {
  Button,
  Dropdown,
  Input,
  Modal,
  notification,
  Select,
  Tag,
} from "antd";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import FormCustomer from "../../../components/admin/formCustomer";
import { useEffect, useState } from "react";
import {
  getAllCustomer,
  removeCustomerById,
  searchAndPaging,
} from "../../../services/customerService";
import useDebouce from "../../../hooks/useDebounce";
import Loader from "../../../components/base/Loader";
import "./index.css";

const Customer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baseId, setBaseId] = useState(null);

  const [isShowForm, setIsShowForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(1);

  const debounce = useDebouce(keySearch, 300);

  const findAllCustomer = async () => {
    const response = await getAllCustomer();

    // Tổng số bản ghi
    const totalRecords = response.data.length;

    // Cập nhật tổng số bản ghi
    setTotalRecord(totalRecords);

    // Lấy ra tổng số trang
    const pages = Math.ceil(totalRecords / pageSize);

    setTotalPage(pages);
  };

  useEffect(() => {
    findAllCustomer();
  }, [pageSize]);

  const loadData = async (searchValue) => {
    // Mở loader
    setIsShowLoader(true);
    const response = await searchAndPaging(searchValue, pageSize, currentPage);

    setCustomers(response.data);

    // Tắt loader
    setIsShowLoader(false);
  };

  useEffect(() => {
    loadData(debounce);
  }, [debounce, pageSize, currentPage]);

  // Hàm chọn trang hiện tại
  const handleActivePage = (page) => {
    setCurrentPage(page);
  };

  // Hàm chuyển đến trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Hàm quay lại trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Render danh sách các trang
  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }

    return (
      <>
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => handleActivePage(page)}
            className={`${
              page === currentPage ? "active" : ""
            } h-8 w-8 border flex items-center justify-center rounded cursor-pointer hover:bg-[#dadada]`}
          >
            {page}
          </div>
        ))}
      </>
    );
  };

  // Hàm mở Form quản lý khách hàng
  // NVQUY (24/09/2024)
  const handleShowForm = () => {
    setIsShowForm(true);
  };

  // Hàm đóng Form quản lý khách hàng
  // NVQUY (24/09/2024)
  const handleCloseForm = () => {
    setIsShowForm(false);
  };

  /**
   * Lấy số lượng bản ghi / trang
   * @param {*} size Số lượng bản ghi
   * NVQUY (24/09/2024)
   */
  const handleGetPageSize = (size) => {
    setPageSize(size);
  };

  // Mở modal xác nhận xóa
  const handleShowModal = (id) => {
    // Mở modal
    setIsModalOpen(true);

    // Cập nhật lại baseId
    setBaseId(id);
  };

  // Đóng modal xác nhận xóa
  const handleCloseModal = () => {
    setIsModalOpen(close);
  };

  // Hàm xác nhận xóa
  const handleConfirmDelete = async () => {
    try {
      const response = await removeCustomerById(baseId);

      if (response.status === 200) {
        // Đóng modal
        handleCloseModal();

        // Render lại danh sách customer
        loadData(debounce);

        findAllCustomer();

        // Hiển thị một thông báo
        notification.success({
          message: "Thành công",
          description: "Xóa thông tin khách hàng thành công",
        });
      }
    } catch (error) {
      // Xử lý lỗi
    }
  };

  const items = [
    {
      key: "1",
      label: <span>Hủy bỏ bộ lọc</span>,
    },
    {
      key: "2",
      label: <span>Đang hoạt động</span>,
    },
    {
      key: "3",
      label: <span>Ngừng hoạt động</span>,
    },
  ];

  const options = (id) => [
    {
      key: "4",
      label: <span>Chỉnh sửa</span>,
    },
    {
      key: "5",
      label: <span>Chặn</span>,
    },
    {
      key: "6",
      label: <span onClick={() => handleShowModal(id)}>Xóa</span>,
    },
  ];

  return (
    <>
      <Modal
        title={<h3 className="text-[20px]">Xác nhận xóa</h3>}
        open={isModalOpen}
        onCancel={handleCloseModal}
        maskClosable={false}
        footer={
          <>
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button onClick={handleConfirmDelete} danger type="primary">
              Xóa
            </Button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn xóa khách hàng này không?</p>
      </Modal>

      {/* Hiệu ứng loader khi tải dữ liệu */}
      {isShowLoader && <Loader />}

      {/* Danh sách khách hàng */}
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6  ">
          <h1 className="text-[24px] font-bold">Danh sách khách hàng</h1>
          <Button onClick={handleShowForm} type="primary">
            Thêm mới khách hàng
          </Button>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <Button className="border-none shadow-none">
              <FaFilter
                size={20}
                className="cursor-pointer text-gray-500 hover:text-gray-600"
              />
            </Button>
          </Dropdown>

          <div className="flex items-center gap-3">
            <Input.Search
              onChange={(e) => setKeySearch(e.target.value)}
              value={keySearch}
              className="w-[300px]"
              placeholder="Tìm kiếm tài khoản theo tên"
            />
            <LuRefreshCw
              onClick={() => loadData(debounce)}
              size={24}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 h-11 text-left">Tên</th>
                <th className="px-4 h-11 text-left">Giới tính</th>
                <th className="px-4 h-11 text-left cursor-pointer">
                  Ngày sinh
                </th>
                <th className="px-4 h-11 text-left">Email</th>
                <th className="px-4 h-11 text-left">Địa chỉ</th>
                <th className="px-4 h-11 text-left">Trạng thái</th>
                <th className="px-4 h-11 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr className="border-b" key={customer.id}>
                  <td className="px-4 h-11">{customer.name}</td>
                  <td className="px-4 h-11">
                    {customer.gender === 0
                      ? "Nam"
                      : customer.gender === 1
                      ? "Nữ"
                      : "Khác"}
                  </td>
                  <td className="px-4 h-11">{customer.dateOfBirth}</td>
                  <td className="px-4 h-11">{customer.email}</td>
                  <td className="px-4 h-11">{customer.address}</td>
                  <td className="px-4 h-11">
                    {customer.status ? (
                      <Tag color="green">Đang hoạt động</Tag>
                    ) : (
                      <Tag color="red">Ngừng hoạt động</Tag>
                    )}
                  </td>
                  <td className="px-4 h-11">
                    <Dropdown
                      menu={{
                        items: options(customer.id),
                      }}
                      placement="bottom"
                      trigger={["click"]}
                    >
                      <Button className="border-none shadow-none focus:shadow-none focus:bg-none">
                        Sửa
                      </Button>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center ">
          <div>
            Hiển thị <b>{customers.length}</b> trên <b>{totalRecord}</b> bản ghi
          </div>
          <div className="flex items-center gap-5">
            <Select
              onChange={handleGetPageSize}
              defaultValue="Hiển thị 10 bản ghi / trang"
              style={{
                width: 220,
              }}
              options={[
                {
                  value: "10",
                  label: "Hiển thị 10 bản ghi / trang",
                },
                {
                  value: "20",
                  label: "Hiển thị 20 bản ghi / trang",
                },
                {
                  value: "50",
                  label: "Hiển thị 50 bản ghi / trang",
                },
                {
                  value: "100",
                  label: "Hiển thị 100 bản ghi / trang",
                },
              ]}
            />
            <div className="flex items-center gap-3">
              <div
                onClick={handlePreviousPage}
                className="h-8 w-8 border flex items-center justify-center rounded cursor-pointer hover:bg-[#dadada]"
              >
                <IoIosArrowBack
                  className={`${currentPage === 1 ? "disable" : ""}`}
                />
              </div>
              {renderPages()}
              <div
                onClick={handleNextPage}
                className="h-8 w-8 border flex items-center justify-center rounded cursor-pointer hover:bg-[#dadada]"
              >
                <IoIosArrowForward
                  className={`${currentPage === totalPage ? "disable" : ""}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form quản lý */}
      {isShowForm && <FormCustomer onCloseForm={handleCloseForm} />}
    </>
  );
};

export default Customer;
