---
title: 安全
description: 安全
---

# 安全面试题

## cookie和token的区别

Cookie和Token是两种不同的认证和会话管理机制，以下是它们的主要区别：

* 存储位置：

  * Cookie：由服务器生成并存储在客户端浏览器中，每次请求都会自动包含在HTTP请求头中。
  * Token：通常存储在客户端的本地存储或会话存储中，需要手动包含在请求头中。

* 使用方式：

  * Cookie：用于传统的会话管理，服务器生成Session ID并通过Cookie发送给客户端，每次请求时浏览器会自动发送Cookie。
  * Token：通常为JWT（JSON Web Token），是一种自包含的、携带认证信息的字符串，客户端需要在每次请求中手动添加Token到请求头中。

* 安全性：

  * Cookie：容易受到CSRF（跨站请求伪造）攻击，因为浏览器会自动发送Cookie。可以通过设置HttpOnly标志减少XSS（跨站脚本）攻击的风险。
  * Token：因为浏览器不会自动发送Token，可以减少CSRF攻击的风险。Token通常是签名的，确保数据的完整性和真实性。

* 扩展性和标准化：

  * Cookie：基于RFC 6265标准，广泛支持并经过充分测试。
  * Token：如JWT，基于RFC 7519标准，可以跨多种系统和服务使用，具有更高的灵活性和可扩展性。

* 服务器端状态：

  * Cookie：服务器需要保存Session数据，与Session ID对应，增加了服务器的存储和管理负担。
  * Token：服务器不需要保存会话数据，所有信息都包含在Token中，便于水平扩展。
