package backend.app.lifemanager.course;

import backend.app.lifemanager.security.authentication.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//Todo: replace this with proper DB interaction implementation
@Service
public class CoursesHardcodedService {

	private static List<Course> courses = new ArrayList<>();
	private static long idCounter = 0;

	private final IAuthenticationFacade authenticationFacade;

	@Autowired
	public CoursesHardcodedService(IAuthenticationFacade authenticationFacade) {
		this.authenticationFacade = authenticationFacade;
	}

	static {
		courses.add(new Course(++idCounter, "in28minutes", "Learn Full stack with Spring Boot and Angular"));
		courses.add(new Course(++idCounter, "in28minutes", "Learn Full stack with Spring Boot and React"));
		courses.add(new Course(++idCounter, "in28minutes", "Master Microservices with Spring Boot and Spring Cloud"));
		courses.add(new Course(++idCounter, "in28minutes",
				"Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes"));
		courses.add(new Course(++idCounter, "justas",
				"Random Course description 1"));
		courses.add(new Course(++idCounter, "justas",
				"Random Course description 2"));
	}

	public List<Course> findAll() {
		return courses;
	}

	public List<Course> findAllUserCourses() {
		Authentication authentication = authenticationFacade.getAuthentication();
		String currentPrincipalName = authentication.getName();
		return courses.stream().filter(course -> course.getUsername().equals(currentPrincipalName)).collect(Collectors.toList());
	}

	public Course findById(long id) {
		for (Course course: courses) {
			if (course.getId() == id) {
				return course;
			}
		}
		return null;
	}

	public Course deleteById(long id) {
		Course course = findById(id);

		if (course == null)
			return null;

		if (courses.remove(course)) {
			return course;
		}

		return null;
	}
}