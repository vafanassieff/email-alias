# OVH

To add OVH keys use `email-alias provider configure ovh` and `email-alias provider set ovh`

You need to create an API key [https://www.ovh.com/auth/api/createToken](here)

The key need to have this permissions :

The **{domain}** is the domain on ovh (i.e `example.com`)

- `GET:     /email/domain/{domain}/redirection/*`
- `PUT:     /email/domain/{domain}/redirection/*`
- `POST:    /email/domain/{domain}/redirection/*`
- `DELETE:  /email/domain/{domain}/redirection/*`
