import dayjs from 'dayjs';

const url = 'http://localhost:3000';

export async function searchFlights({ from, to, departDate, returnDate }) {
  try {
    const response = await fetch(
      `${url}/search?from=${from}&to=${to}&departDate=${dayjs(
        departDate
      ).format('YYMMDD')}&returnDate=${dayjs(returnDate).format('YYMMDD')}`
    );

    if (response.status !== 200) {
      return { error: 'Failed to search', data: [] };
    }

    return {
      data: await response.json(),
    };
  } catch (e) {
    return {
      error: 'Network error',
      data: [],
    };
  }
}
