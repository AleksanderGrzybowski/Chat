package chat

import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.web.filter.OncePerRequestFilter

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * I have no idea why both grails cors plugin and this code is required 
 * for basic-auth OPTIONS requests to protected routes to work.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse resp, FilterChain chain)
            throws ServletException, IOException {

        String origin = req.getHeader("Origin")
        boolean options = "OPTIONS" == req.method
        
        if (options) {
            if (origin == null) return
            resp.addHeader("Access-Control-Allow-Headers", "origin, authorization, accept, content-type, x-requested-with")
            resp.addHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS")
            resp.addHeader("Access-Control-Max-Age", "3600")

            resp.addHeader("Access-Control-Allow-Origin", origin == null ? "*" : origin)
            resp.addHeader("Access-Control-Allow-Credentials", "true")
        }


        if (!options) chain.doFilter(req, resp)
    }
}