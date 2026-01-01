import React from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  const friendRequests = [
    {
      id: 1,
      name: 'Ngọc Hà HR',
      mutualFriends: 6,
      avatar: 'https://ui-avatars.com/api/?name=Ngoc+Ha&background=random'
    }
  ];

  const birthdays = [
    {
      name: 'Phùng Trung Kiên và Duy Lê',
      message: 'Hôm nay là sinh nhật của'
    }
  ];

  const contacts = [
    { id: 1, name: 'Meta AI', avatar: 'https://ui-avatars.com/api/?name=Meta+AI&background=0084FF', online: true },
    { id: 2, name: 'Phạm Hùng', avatar: 'https://ui-avatars.com/api/?name=Pham+Hung&background=random', online: false },
    { id: 3, name: 'Minh Ngọc', avatar: 'https://ui-avatars.com/api/?name=Minh+Ngoc&background=random', online: false },
    { id: 4, name: 'Phạm Minh Quân', avatar: 'https://ui-avatars.com/api/?name=Pham+Minh+Quan&background=random', online: false },
    { id: 5, name: 'Nguyễn Văn Khánh', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+Khanh&background=random', online: false },
    { id: 6, name: 'Nguyen Minh Quang', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Minh+Quang&background=random', online: false }
  ];

  return (
    <div className="right-sidebar">
      <div className="right-sidebar-content">
        {/* Friend Requests */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3>Lời mời kết bạn</h3>
            <a href="/friends/requests" className="see-all">Xem tất cả</a>
          </div>
          {friendRequests.map(request => (
            <div key={request.id} className="friend-request">
              <img src={request.avatar} alt={request.name} />
              <div className="friend-request-info">
                <p className="friend-name">{request.name}</p>
                <p className="mutual-friends">{request.mutualFriends} ngày</p>
                <div className="friend-request-actions">
                  <button className="btn-confirm">Xác nhận</button>
                  <button className="btn-delete">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar-divider"></div>

        {/* Birthdays */}
        <div className="sidebar-section">
          <h3>Sinh nhật</h3>
          {birthdays.map((birthday, index) => (
            <div key={index} className="birthday-item">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#F02849">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <p>{birthday.message} <strong>{birthday.name}</strong>.</p>
            </div>
          ))}
        </div>

        <div className="sidebar-divider"></div>

        {/* Contacts */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3>Người liên hệ</h3>
            <div className="contacts-actions">
              <button className="icon-btn" title="Tìm kiếm">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <g fillRule="evenodd" transform="translate(-448 -544)">
                    <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)"></path>
                    <path d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z" transform="translate(448 544)"></path>
                    <path d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z" transform="translate(448 544)"></path>
                  </g>
                </svg>
              </button>
              <button className="icon-btn" title="Tùy chọn">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact.id} className="contact-item">
                <div className="contact-avatar-wrapper">
                  <img src={contact.avatar} alt={contact.name} />
                  {contact.online && <span className="online-status"></span>}
                </div>
                <span className="contact-name">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
