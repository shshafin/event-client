import {
  addEvent,
  getEventById,
  getEvents,
  searchEventsByName,
} from "@/services/Event-Service";
import { useQuery, useMutation } from "@tanstack/react-query";

//  Get all events
export const useGetEvents = () => {
  return useQuery({
    queryKey: ["GET_EVENTS"],
    queryFn: async () => await getEvents(),
  });
};

//  Get single event by ID
export const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: ["GET_EVENT", id],
    queryFn: async () => await getEventById(id),
    enabled: !!id,
  });
};

// ✅ Search events by name
export const useSearchEvents = (name: string) => {
  return useQuery({
    queryKey: ["SEARCH_EVENTS", name],
    queryFn: async () => await searchEventsByName(name),
    enabled: !!name,
  });
};

// ✅ Add new event (admin only)
export const useAddEvent = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => await addEvent(formData),
  });
};
