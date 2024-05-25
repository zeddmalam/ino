This is a test assessment on system design and implementation.

Database communication happens in the api(main application) due to te application requirements. For the requirement to importinf of all time series, the fetchers logic would be to forward all timeseries to the message queue and periodically check for the new events. Message queue subscriber would include the importing logic then. As soon as redis is used as a caching subsystem, invalidation of a cache will work between services.

DB schema is placed in `<ROOT>/api/prisma/schema.prisma`

## Local run

1. Create `.env` files in `api`, `fetcher`, `web` and root folder.
2. In root folder run

```bash
docker compose build && docker compose up
```

3. Browse (http://localhost:3001)[http://localhost:3001]

## Tradeoffs

1. There were no many requirements for a frontend application and i've used nextjs template with preconfigured react testing library. That's why it slightly differs from backend micro services.
2. Auth is not implemented which makes system insecure. I would strongly recommend to use Oauth with rotated JWT
3. It was not required but I decided to implement caching on a frontend part as well by using tanstack query package.
4. For the backend caching I used redis. Alternative would be, for example, in memory cache like `node-cache` which would provide a smaller latency but would use container memory in less optimised way
5. Further redis optimisation can be performed with protobuf.
6. I decided to make fetcher service as simple as possible with response of external service piped to fetcher response. This helped to optimise memory usage.
7. External service payload is splitted in 3 models. This design allows to have more flexible structures. For example, a patient may not need to do some particular tests like creatine or chloride, or need to do only potassium.
8. I don't have any enums for units, gender or etnicity, that's why i didn't use enums in DB scheme. So i used text for this.
9. Monorepo structure is simplified for easiness of testing